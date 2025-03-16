"use client";

import React from "react";
import { protectRoute } from "@/middleware/authMiddleware";

export default function page() {
  protectRoute();
  return <div>dashbord</div>;
}
