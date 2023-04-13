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
    options: ClientOptions = {}
  ) {
    this._model = options.model;
    this._client = createOpenAI(endpoint, credential, options);
  }

  private getModelName(options: { model?: string }): string {
    return options.model ?? this._model ?? "gpt-35-turbo";
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
    const model = this.getModelName(options);
    return getEmbeddings(this._client, input, model, options);
  }

  getChatCompletions(
    messages: ChatMessage[],
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<DeploymentChatCompletionsOptionsChatCompletions> {
    const model = this.getModelName(options);
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
    const model = this.getModelName(options);
    return getCompletions(this._client, model, promptOrOptions as any, options);
  }
}
