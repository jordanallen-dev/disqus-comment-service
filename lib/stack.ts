import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CommentStepFunction } from "./comment_step_function";
import { EmailIngestion } from "./ijp_email_ingestion";

export class DisqusCommentServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const emailIngestion = new EmailIngestion(this, id + "-Email");

    const commentStepFunction = new CommentStepFunction(this, id + "-Comment");
  }
}
