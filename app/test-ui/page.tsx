"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";

export default function TestUIPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold">UI Components Test</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Shadcn UI Components</CardTitle>
          <CardDescription>Testing all the new components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          
          <Separator />
          
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          
          <Separator />
          
          <ScrollArea className="h-32 w-full rounded-md border p-4">
            <div className="space-y-2">
              <p>Scrollable content area</p>
              <p>Line 1</p>
              <p>Line 2</p>
              <p>Line 3</p>
              <p>Line 4</p>
              <p>Line 5</p>
              <p>Line 6</p>
              <p>Line 7</p>
              <p>Line 8</p>
              <p>Line 9</p>
              <p>Line 10</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}


