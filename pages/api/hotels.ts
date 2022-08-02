import type { NextApiRequest, NextApiResponse } from "next";

interface Image {
  altText: string | null;
  height: number;
  width: number;
  url: string;
  isHeroImage: boolean;
}

interface Hotel {
  hotelId: string;
  name: string;
  currency: string;
  starRating: number;
  description: { short: string };
  phoneNumbers: [];
  contractable: boolean;
  emails: string[];
  websiteUrl: string | null;
  images: Image[];
  address: {};
  location: {};
  timezone: string;
  amenities: any[];
  roomCount: number;
  checkIn: { from: string; to: string };
  checkOut: { to: string };
  termsAndConditions: string;
  createdAt: string;
  updatedAt: string;
  externalUrls: [];
  roomTypes: any[];
}

type Data = {
  data: Hotel[];
  pagination: {
    count: number;
    total: number;
    next: string | null;
    prev: string | null;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.append("x-api-key", process.env.API_KEY ?? "");
  requestHeaders.append("content-type", "application/json");
  const response = await fetch("https://sandbox.impala.travel/v1/hotels", {
    headers: requestHeaders,
  });
  const output = await response.json();
  res.status(200).json(output);
}
