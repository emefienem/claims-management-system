import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Hono();

const claimSchema = z.object({
  "Claim ID": z.string(),
  "Provider Name": z.string(),
  "Claim Status": z.string(),
  "Provider ID": z.string(),
  "Procedure Code": z.string(),
  "Place of Service": z.string(),
  Billed: z.number(),
  Allowed: z.number(),
  Paid: z.number(),
});

let mrfFiles: string[] = [];

app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  await next();
});

app.use("*", async (c, next) => {
  const token = c.req.header("Authorization");
  if (!token || token !== "Bearer dummy-token") {
    return c.json({ message: "Unauthorized" }, 401);
  }
  await next();
});

app.post("/api/generate-mrf", async (c) => {
  try {
    const { claims }: { claims: any[] } = await c.req.json();

    const { validatedClaims, errors } = validateClaims(claims);

    if (errors.length > 0) {
      return c.json({ message: "Validation failed", errors });
    }

    const mrfFileName = `mrf-${Date.now()}.json`;
    const mrfData = generateMrf(validatedClaims);

    const outputDir = path.join(__dirname, "mrf");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(__dirname, "mrf", mrfFileName);
    fs.writeFileSync(outputPath, JSON.stringify(mrfData, null, 2));

    mrfFiles.push(mrfFileName);

    return c.json({ message: "MRF file generated successfully", fileName: mrfFileName });
  } catch (err: any) {
    return c.json({ message: err.message });
  }
});

app.get("/api/mrf-files", (c) => {
  return c.json(mrfFiles);
});

const validateClaims = (data: any[]) => {
  const validatedClaims: any[] = [];
  const errors: string[] = [];

  data.forEach((claim, index) => {
    try {
      validatedClaims.push(claimSchema.parse(claim));
    } catch (e: any) {
      errors.push(`Invalid claim at row ${index + 1}: ${e.errors}`);
    }
  });

  return { validatedClaims, errors };
};

function generateMrf(claims: any[]) {
  const averages = claims.reduce((acc, claim) => {
    const key = `${claim["Provider ID"]}-${claim["Procedure Code"]}-${claim["Place of Service"]}`;
    if (!acc[key]) {
      acc[key] = { count: 0, total: 0, total_allowed: 0, total_paid: 0 };
    }
    acc[key].count += 1;
    acc[key].total += parseFloat(claim.Billed);
    acc[key].total_allowed += parseFloat(claim.Allowed);
    acc[key].total_paid += parseFloat(claim.Paid);
    return acc;
  }, {});

  return Object.keys(averages).map((key) => {
    const [provider_id, procedure_code, place_of_service] = key.split("-");
    const { count, total, total_allowed, total_paid } = averages[key];
    return {
      "Provider ID": provider_id,
      "Procedure Code": procedure_code,
      "Place of Service": place_of_service,
      "Average Amount": total / count,
      "Total Allowed": total_allowed,
      "Total Paid": total_paid,
    };
  });
}

// Start the server
serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
