// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./common/interfaces.js";
import {
  DeploymentEmbeddingsOptionsEmbeddings,
  DeploymentCompletionsOptionsCompletions,
  DeploymentChatCompletionsOptionsChatCompletions,
  ChatMessage,
  createOpenAI,
  OpenAIContext,
  getEmbeddings,
  getCompletions,
  getChatCompletions,
  GetEmbeddingsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
} from "./api/index.js";

export class OpenAIClient {
  private _client: OpenAIContext;
  private _model?: string;

  /** Azure OpenAI APIs for completions and search */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    options?: ClientOptions
  );
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    model: string,
    options?: ClientOptions
  );
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    modelOrOptions: string | ClientOptions = {},
    options: ClientOptions = {}
  ) {
    let opts: ClientOptions;
    if (typeof modelOrOptions === "string") {
      this._model = modelOrOptions;
      opts = options;
    } else {
      opts = modelOrOptions;
    }
    this._client = createOpenAI(endpoint, credential, opts);
  }

  private getModel(options: { model?: string }): string {
    const model = options.model ?? this._model;
    if (!model) {
      throw new Error("No model was specified in the client or in the operation options.");
    }
    return model;
  }

  getEmbeddings(
    input: string,
    options?: GetEmbeddingsOptions
  ): Promise<DeploymentEmbeddingsOptionsEmbeddings>;
  getEmbeddings(
    input: string[],
    options?: GetEmbeddingsOptions
  ): Promise<DeploymentEmbeddingsOptionsEmbeddings>;
  getEmbeddings(
    input: string | string[],
    options: GetEmbeddingsOptions = { requestOptions: {} }
  ): Promise<DeploymentEmbeddingsOptionsEmbeddings> {
    const model = this.getModel(options);
    return getEmbeddings(this._client, input, model, options);
  }

  getChatCompletions(
    messages: ChatMessage[],
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<DeploymentChatCompletionsOptionsChatCompletions> {
    const model = this.getModel(options);
    return getChatCompletions(this._client, messages, model, options);
  }

  getCompletions(
    prompt: string,
    options?: GetCompletionsOptions
  ): Promise<DeploymentCompletionsOptionsCompletions>;
  getCompletions(
    prompt: string[],
    options?: GetCompletionsOptions
  ): Promise<DeploymentCompletionsOptionsCompletions>;
  getCompletions(
    options?: GetCompletionsOptions
  ): Promise<DeploymentCompletionsOptionsCompletions>;
  getCompletions(
    promptOrOptions?: string | string[] | GetCompletionsOptions,
    options: GetCompletionsOptions = { requestOptions: {} }
  ): Promise<DeploymentCompletionsOptionsCompletions> {
    const model = this.getModel(options);
    return getCompletions(this._client, model, promptOrOptions as any, options);
  }
}
