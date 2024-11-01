# PCF iFrame

## Overview

The PCF iFrame project is a custom PowerApps Component Framework (PCF) control for Dataverse. This control allows users to embed external websites or web applications seamlessly within Microsoft Dynamics 365 or PowerApps environments. It offers customization options for setting the iFrame URL, height, width, and query string parameters to tailor the embedded content.

## Features

- **URL Embedding**: Dynamically embed any URL within the iFrame.
- **Customizable Dimensions**: Adjust the iFrame's height and width to fit the display requirements.
- **Query String Parameters**: Add custom query string parameters to the URL for flexible configurations.
- **Toggle Button Controls**: Enable or disable buttons to open content in a new tab or full-screen mode.

## ControlManifest.Input.xml Explained

The `ControlManifest.Input.xml` file defines the control’s metadata and configuration.

- **Namespace and Constructor**: Specifies the namespace and constructor name for the control.
- **External Service Usage**: Indicates no use of external services (set to `false`).
- **Properties**:
  - `UrlPart1`, `UrlPart2`, `UrlPart3` (required): Components of the URL to be displayed.
  - `Height` and `Width`: Custom dimensions for the iFrame.
  - `QueryStringName` and `QueryStringValue`: Optional parameters for passing query strings to the URL.
  - `EnableOpenInNewTab` and `EnableOpenFullPage`: Toggle options to enable/disable the buttons for opening in a new tab or full screen.

## index.ts Explained

The TypeScript file `index.ts` contains the logic for the PCF control.

- **Constructor**: Initializes required variables.
- **init Method**: Sets up the iFrame and buttons for opening the content in a new tab or toggling full screen.
- **updateView Method**: Updates the control whenever property values change. It constructs the full URL, manages dimensions, and controls button visibility.
- **getOutputs Method**: Returns outputs from the control. This control does not produce outputs, so it returns an empty object.
- **destroy Method**: Handles cleanup activities when the control is removed from the DOM, including removing event listeners and custom elements.

## Building the Project

To prepare and build the project for deployment:

1. **Install Node.js**: Ensure Node.js is installed on your machine. It’s required for managing dependencies and building the project.
2. **Clone the Repository**: Clone the project repository to your local machine.
3. **Navigate to the Project Directory**: Open a terminal and navigate to the project’s root directory.
4. **Install Dependencies**: Run:
    ```bash
    npm install
    ```
    This command installs all dependencies defined in `package.json`.


## Usage

After building, import the control into your Power Apps environment. It can be used in any model-driven form where iFrame embedding is required.

### Configuration Options
- **URL Parts (required)**: Combine `UrlPart1`, `UrlPart2`, and `UrlPart3` to define the URL to be embedded.
- **Height and Width (optional)**: Set the dimensions to fit the form display.
- **Query String Name/Value (optional)**: Append to the end of the URL as custom parameters.
- **Button Toggles**: Use `EnableOpenInNewTab` and `EnableOpenFullPage` to control the visibility of the buttons.

Example URL:
`{UrlPart1}{UrlPart2}{UrlPart3}?{QueryStringName}={QueryStringValue}`

## Deployment

To deploy the component, use the following command:
```bash
pac pcf push --publisher-prefix mightora
```
**OR**
```bash
pac pcf push --solution-unique-name iFrameWithSplitURL
```

This control is developed using TypeScript, making it easily extendable. Modify the control logic by updating the index.ts file.

## Debugging
Use console logs for debugging. Ensure they are removed in the production build for optimal performance.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Support
For support or questions, please open an issue in the GitHub repository.