import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Checkbox } from "../checkbox";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from "../input-group";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Textarea } from "../textarea";
import { Toggle } from "../toggle";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

describe("basic UI wrappers", () => {
  it("renders avatar and card primitives", () => {
    render(
      <div>
        <Avatar data-testid="avatar">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
          <AvatarBadge>1</AvatarBadge>
        </Avatar>
        <AvatarGroup data-testid="avatar-group">
          <AvatarGroupCount>+2</AvatarGroupCount>
        </AvatarGroup>
        <Card size="sm" data-testid="card">
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardContent>Body</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      </div>,
    );

    expect(screen.getByTestId("avatar")).toHaveAttribute("data-slot", "avatar");
    expect(screen.getByTestId("card")).toHaveAttribute("data-size", "sm");
    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "card-title");
  });

  it("renders checkbox, separator, skeleton and textarea", () => {
    render(
      <div>
        <Checkbox checked aria-label="Accept" />
        <Separator />
        <Skeleton data-testid="skeleton" />
        <Textarea aria-label="Notes" />
      </div>,
    );

    expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute(
      "data-slot",
      "checkbox",
    );
    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "data-slot",
      "skeleton",
    );
    expect(screen.getByLabelText("Notes")).toHaveAttribute(
      "data-slot",
      "textarea",
    );
  });

  it("renders table, tabs, toggle and breadcrumb primitives", () => {
    render(
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Row</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
          <TableCaption>Caption</TableCaption>
        </Table>

        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Panel</TabsContent>
        </Tabs>

        <Toggle pressed aria-label="Bold">
          B
        </Toggle>

        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Left">
            L
          </ToggleGroupItem>
        </ToggleGroup>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contacts</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbList>
        </Breadcrumb>
      </div>,
    );

    expect(screen.getByText("Name")).toHaveAttribute("data-slot", "table-head");
    expect(screen.getByText("One")).toHaveAttribute("data-slot", "tabs-trigger");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "data-slot",
      "toggle",
    );
    expect(screen.getByText("Home")).toHaveAttribute("data-slot", "breadcrumb-link");
  });

  it("renders input group controls and interactions", () => {
    render(
      <InputGroup>
        <InputGroupAddon>+</InputGroupAddon>
        <InputGroupInput aria-label="Phone" />
        <InputGroupButton aria-label="Search">Go</InputGroupButton>
        <InputGroupTextarea aria-label="Message" />
      </InputGroup>,
    );

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByLabelText("Phone")).toHaveFocus();
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute(
      "data-slot",
      "button",
    );
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "data-slot",
      "input-group-control",
    );
  });
});