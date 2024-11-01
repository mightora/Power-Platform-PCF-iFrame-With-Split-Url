# PCF iFrame

## Overview

This project entails the development of a custom iFrame PowerApps Component Framework (PCF) control for Dataverse. The control allows users to embed external websites or web applications within their Microsoft Dynamics 365 or PowerApps environments. It provides customizable properties, such as the URL to be displayed within the iFrame, an optional height for the iFrame, and optional query string parameters to be appended to the URL.

## Features

- **URL Embedding**: Dynamically embeds a URL within the iFrame.
- **Height Customization**: Allows setting a custom height for the iFrame.
- **Query String Parameters**: Enables passing additional query string parameters to the URL.

## ControlManifest.Input.xml Explained

This file defines the metadata and configuration for the PCF control.

- **Namespace and Constructor**: Specifies the namespace and the constructor name for the control.
- **External Service Usage**: Indicates whether the control makes use of external services. In this project, it is set to `false` since the control does not interact with external web services.
- **Properties**: Defines three properties that the control accepts:
  - `UrlValue` (required): The URL to be displayed.
  - `Height`: An optional height for the iFrame.
  - `QueryStringName` and `QueryStringValue`: Optional parameters for passing query strings to the URL.

## index.ts Explained

The TypeScript file contains the logic for the PCF control.

- **Constructor**: Used for any initial setup. It is empty in this control.
- **init Method**: Initializes the control. It creates the iFrame element, sets its width and default height, and adds it to the container.
- **updateView Method**: Called when any property value changes. It constructs the full URL with any query string parameters and updates the iFrame's `src` attribute. If a height is provided, it updates the iFrame's height.
- **getOutputs Method**: Returns any outputs from the control. This control does not produce outputs, so it returns an empty object.
- **destroy Method**: Used for cleanup activities when the control is removed from the DOM. This can include removing event listeners or canceling any pending operations.

## Building the Project

To prepare your environment and build the project for production, follow these steps:

1. **Install Node.js**: Ensure that Node.js is installed on your development machine. It's required to run the package management and build tools.

2. **Clone the Repository**: Clone the project repository to your local machine using your preferred Git client or the command line.

3. **Navigate to the Project Directory**: Change into the project's root directory in your command line or terminal.

4. **Install Dependencies**: Run the following command to install the necessary dependencies for the project:

    ```bash
    npm install
    ```

    This command installs all the dependencies defined in `package.json`.

5. **Build the Project**: To compile the project and prepare it for deployment, run the following command:

    ```bash
    npm run build -- --buildMode production
    ```

    This command triggers the build process in production mode, optimizing the output for deployment.


## Usage
After building the control, it can be imported into your Power Apps environment. It can be used in any model-driven where you need to display a iFrame.

### Configuration
- **URL Value**: Bind the control to a field in your Power Apps environment.
- **Height (optional)**: Modify the hight so it fits within your form.
- **Query String Name (optional)**: Appends to the end of the URL value.
- **Query String Value (optional)**: Appends to the end of the URL value.

e.g. {URL Value}{Query String Name}{Query String Value}

## Deplyment 
`pac pcf push --publisher-prefix mightora`

## Development
This control is developed using TypeScript. You can extend or modify the control by updating the `index.ts` file.

### Debugging
Use console logs for debugging purposes. Ensure to remove them in the production build for optimal performance.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support and queries, please open an issue in the GitHub repository.