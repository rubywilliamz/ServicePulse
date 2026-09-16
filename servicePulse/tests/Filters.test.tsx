import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Filters } from "../src/components/Filters";

describe("Filters", () => {
  it("reports filter changes and reset interactions", () => {
    const onRegionChange = vi.fn();
    const onReset = vi.fn();

    render(
      <Filters
        region=""
        service=""
        environment=""
        activeFilterCount={0}
        regionOptions={["us-east"]}
        serviceOptions={["payments"]}
        environmentOptions={["production"]}
        onRegionChange={onRegionChange}
        onServiceChange={vi.fn()}
        onEnvironmentChange={vi.fn()}
        onReset={onReset}
      />,
    );

    fireEvent.change(screen.getByLabelText("Region"), { target: { value: "us-east" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset Filters" }));

    expect(onRegionChange).toHaveBeenCalledWith("us-east");
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});