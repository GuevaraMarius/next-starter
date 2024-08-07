import { formatDate } from "@/utils/functions/date";

describe("formatDate function", () => {
  test("formats the date correctly", () => {
    const date = "2024-08-07";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("August 7, 2024");
  });
});
