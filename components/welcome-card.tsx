"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const WelcomeCard = () => {
  const { user } = useUser();
  return (
    <Card className="mb-12">
      <CardHeader className="relative flex items-center justify-between">
        {/* Texte  */}
        <div>
          <CardTitle className="text-3xl">Hello {user?.firstName}!</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            It's good to see you again.
          </CardDescription>
        </div>

        {/* Image  */}
        <Image
          src="/freepik__background__37877.png"
          alt="header-image"
          width={300}
          height={300}
          className="absolute right-0 rounded-lg" 
        />
      </CardHeader>

      <CardContent>{/* Autre contenu si nécessaire */}</CardContent>
    </Card>
  );
};
