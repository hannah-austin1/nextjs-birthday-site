import { NextResponse } from "next/server";
import { promises as fs } from "fs";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import Replicate from "replicate";

import path from "path";

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.fixedWindow(5, "1440 m"),
// });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {
  // const identifier = "api-route";
  // const result = await ratelimit.limit(identifier);

  // if (!result.success) {
  //   return NextResponse.json("No generations remaining.", {
  //     status: 429,
  //     headers: {
  //       "X-RateLimit-Limit": result?.limit,
  //       "X-RateLimit-Remaining": result?.remaining,
  //     },
  //   });
  // }

  const model =
    "timothybrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f";

  const { prompt } = await request.json();

  const imagesDirectory = path.join(process.cwd(), "public");
  const filePath = path.join(imagesDirectory, "danibday.png");
  console.log(filePath);

  const imgBuffer = await fs.readFile(filePath);
  const base64 = imgBuffer.toString("base64");
  const mimeType = "image/png";
  const dataURI = `data:${mimeType};base64,${base64}`;

  try {
    const output = await replicate.run(model, {
      input: {
        prompt: `
        Given this input image of a person, generate a new image with a different background related to ${prompt} while ensuring that the person remains unchanged. The new background should seamlessly blend with the person's existing pose, lighting, and appearance. Pay close attention to details such as hair, clothing, and shadows to maintain the natural and realistic look of the person. The goal is to create a visually convincing image where the person appears to be in a different environment without any noticeable alterations to their individual features.`,
        image: dataURI,
        scheduler: "K_EULER_ANCESTRAL",
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 100,
        image_guidance_scale: 1.5,
        // ... other model parameters
      },
    });

    return NextResponse.json(output);
  } catch (error) {
    console.log(error);
    return NextResponse.json("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
