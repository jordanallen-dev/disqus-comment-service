import { constructEmailParams } from "./constructEmailParams";

describe("constructEmailParams", () => {
  const errorEvent = {
    Error: "AxiosError",
    Cause:
      '{"errorType":"AxiosError","errorMessage":"Request failed with status code 400","trace":["AxiosError: Request failed with status code 400","    at settle (/var/task/index.js:15673:12)","    at IncomingMessage.handleStreamEnd (/var/task/index.js:16579:11)","    at IncomingMessage.emit (node:events:539:35)","    at endReadableNT (node:internal/streams/readable:1345:12)","    at processTicksAndRejections (node:internal/process/task_queues:83:21)"]}',
  };

  it("generates a paramter payload for SES from a caught error event", () => {
    process.env.EMAIL_NOTIFICATION_RECIPIENT = "recipient@test.com";
    process.env.EMAIL_NOTIFICATION_SENDER = "sender@test.com";

    const params = constructEmailParams(errorEvent);

    expect(params).toStrictEqual({
      Destination: { ToAddresses: [process.env.EMAIL_NOTIFICATION_RECIPIENT] },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: errorEvent.Cause,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `AUTOMATED DISQUS ERROR: ${errorEvent.Error}`,
        },
      },
      Source: process.env.EMAIL_NOTIFICATION_SENDER,
    });
  });

  it("throws an error if the EMAIL_NOTIFICATION_RECIPIENT variable is missing", () => {
    process.env.EMAIL_NOTIFICATION_SENDER = "sender@test.com";
    process.env.EMAIL_NOTIFICATION_RECIPIENT = "";

    expect(() => constructEmailParams(errorEvent)).toThrowError(
      "Missing required environment variable: EMAIL_NOTIFICATION_RECIPIENT"
    );
  });

  it("throws an error if the EMAIL_NOTIFICATION_SENDER variable is missing", () => {
    process.env.EMAIL_NOTIFICATION_SENDER = "";
    process.env.EMAIL_NOTIFICATION_RECIPIENT = "recipient@test.com";

    expect(() => constructEmailParams(errorEvent)).toThrowError(
      "Missing required environment variable: EMAIL_NOTIFICATION_SENDER"
    );
  });
});