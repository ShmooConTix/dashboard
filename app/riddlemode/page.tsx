"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { appStore, ws } from "@/lib/state";
import Image from "next/image";
import { useStore } from "zustand";
import { FormEvent, useState } from "react";
import Countdown from "./_components/Countdown";

// set state to none after submit

export default function Page() {
  const state = useStore(appStore);
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        type: "answer",
        data: answer,
      })
    );

    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-grow w-full justify-center items-center p-4 md:p-0">
      <Card className="max-w-sm w-full">
        {!isSubmitted ? (
          <CardHeader className="pb-2 space-y-0">
            {state.riddle.imageURL && (
              <div className="pb-4 flex w-full justify-center">
                <Image
                  src={state.riddle.imageURL}
                  alt="Riddle Image"
                  className="w-2/3 h-2/3 justify-center"
                  width={200}
                  height={100}
                />
              </div>
            )}
            <CardTitle className="text-xl">
              {state.riddle?.question}
              {state.riddle.backupHTML && "ShmooCon 2025 Riddle"}
              {!state.riddle.backupHTML &&
                !state.riddle.question &&
                "Waiting for riddle..."}
            </CardTitle>
            {!state.riddle.backupHTML && !state.riddle.question && (
              <CardDescription>
                When a client sends a riddle, this page will show it.
              </CardDescription>
            )}
          </CardHeader>
        ) : (
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Success!</CardTitle>
            <CardDescription>
              Your answer has been submitted successfully.
            </CardDescription>
          </CardHeader>
        )}

        {(state.riddle.backupHTML || state.riddle.question) && (
          <CardContent>
            {state.riddle.backupHTML && (
              <div
                className="pb-2"
                dangerouslySetInnerHTML={{ __html: state.riddle.backupHTML }}
              />
            )}

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-y-2"
            >
              <Input
                placeholder="Enter your answer here..."
                className="w-full"
                autoFocus={true}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button
                className="w-full"
                variant={"default"}
                size="sm"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        )}

        {!state.riddle.backupHTML && !state.riddle.question && (
          <CardContent>
            <h1 className="text-center text-muted-foreground">
              Time until next round:
            </h1>
            <Countdown />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
