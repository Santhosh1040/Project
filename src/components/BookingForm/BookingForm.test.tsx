import { render, screen } from "../../utils/tests-ts";
import BookingForm from ".";
import { submitAPI, fetchAPI, initializeTimes, updateTimes } from "../../utils/temp";

describe("BookingForm", () => {
  test("Renders labels and fields", () => {
    render(
      <BookingForm
        availableTimes={{
          times: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        }}
        dispatch={jest.fn((action) => action)}
      />
    );

    // Date label and field
    expect(screen.getByText("Choose date")).toBeInTheDocument();
    expect(screen.getByTestId("res-date")).toBeInTheDocument();

    expect(screen.getByText("Choose time")).toBeInTheDocument();
    expect(screen.getByTestId("res-time")).toBeInTheDocument();

    expect(screen.getByText("Number of guests")).toBeInTheDocument();
    expect(screen.getByTestId("guests")).toBeInTheDocument();

    expect(screen.getByText("Occasion")).toBeInTheDocument();
    expect(screen.getByTestId("occasion")).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Make Your reservation")
    ).toBeInTheDocument();
  });

  // Uncomment and adjust this block if you want to test validation
  /*
  import userEvent from "@testing-library/user-event";
  test("Validation fields", async () => {
    render(
      <BookingForm
        availableTimes={{
          times: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        }}
        dispatch={jest.fn((action) => action)}
      />
    );
    const user = userEvent.setup();
    const numberGuestField = screen.getByTestId("guests");
    const submitButton = screen.getByDisplayValue("Make Your reservation");

    await user.type(numberGuestField, "0");
    await user.click(submitButton);

    expect(screen.getByTestId("guests-error"))
      .toHaveTextContent("Must be at least 1");
  });
  */

  test("initializeTimes returns the correct expected value", () => {
    const today = new Date();
    const initialState = initializeTimes();
    const expectedResult = { times: fetchAPI(today) };
    expect(initialState).toEqual(expectedResult);
  });

  test("updateTimes returns the same state", () => {
    const state = {
      times: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    };
    const action = { type: "SOME_ACTION" };
    const newState = updateTimes(state, action);
    expect(newState).toEqual(state);
  });

  test("submitAPI returns true", () => {
    const formData = {
      date: "2022-10-12",
      time: "20:00",
      guests: 5,
      occasion: "Birthday",
    };
    expect(submitAPI(formData)).toBe(true);
  });
});
