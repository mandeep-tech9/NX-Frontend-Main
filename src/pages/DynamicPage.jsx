import React from "react";
import { useParams } from "react-router-dom";
import GenericCategory from "./GenericCategory";

export default function DynamicPage() {
  const { slug } = useParams();

  return <GenericCategory slug={slug} />;
}