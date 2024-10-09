"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { appStore } from "@/lib/state";
import { baseURL, Configuration } from "@/lib/types";
import { useStore } from "zustand";
import { useToast } from "@/hooks/use-toast";

export function SimpleConfigCard({
  title,
  description,
  k,
}: {
  title: string;
  description: string;
  k: string;
}) {
  const state = useStore(appStore);
  const [configurationValue, setConfigurationValue] = useState(
    k in state.config ? state.config[k as keyof Configuration] : ""
  );
  const { toast, dismiss } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(baseURL + "/config", {
      method: "POST",
      body: JSON.stringify({
        key: k,
        value: configurationValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    toast({
      title: "Successfully Saved! ✅",
      description: (
        <>
          <strong>{title}:</strong>{" "}
          <pre className="break-all whitespace-pre-wrap">
            {configurationValue}
          </pre>
        </>
      ),
    });

    setTimeout(() => {
      dismiss();
    }, 10000);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfigurationValue(event.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            defaultValue={
              k in state.config ? state.config[k as keyof Configuration] : ""
            }
            onChange={handleChange}
          />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
