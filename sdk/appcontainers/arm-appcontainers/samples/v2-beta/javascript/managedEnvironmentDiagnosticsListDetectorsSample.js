/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Get the list of diagnostics for a Managed Environment used to host container apps.
 *
 * @summary Get the list of diagnostics for a Managed Environment used to host container apps.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-06-01-preview/examples/ManagedEnvironmentDiagnostics_List.json
 */
async function getTheListOfAvailableDiagnosticDataForAManagedEnvironments() {
  const subscriptionId = "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const resourceGroupName = "mikono-workerapp-test-rg";
  const environmentName = "mikonokubeenv";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironmentDiagnostics.listDetectors(
    resourceGroupName,
    environmentName
  );
  console.log(result);
}

getTheListOfAvailableDiagnosticDataForAManagedEnvironments().catch(console.error);
