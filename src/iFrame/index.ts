import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { provideFluentDesignSystem, fluentButton } from "@fluentui/web-components";

// Register the Fluent UI button component
provideFluentDesignSystem().register(fluentButton());

export class iFrame implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement; // Container for the control
    private iframe: HTMLIFrameElement; // iFrame element to display external content
    private fullPageButton: HTMLElement; // Button to open URL in a new tab
    private toggleFullScreenButton: HTMLElement; // Button to toggle full-screen mode
    private exitFullScreenIcon: HTMLElement; // Button to exit full-screen mode
    private isFullScreen: boolean = false; // Tracks full-screen mode status
    private currentUrl: string; // Holds the constructed URL for the iframe

    constructor() {}

    /**
     * Initializes the control, creating the iFrame and buttons for interacting with the control.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container;

        // Create and style the iframe element
        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "300px";
        this.iframe.style.border = "1px solid #e1e1e1";
        this.iframe.style.borderRadius = "8px";
        this.iframe.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)";
        this.container.appendChild(this.iframe);

        // Create the "Open in New Tab" button
        this.fullPageButton = document.createElement("fluent-button");
        this.fullPageButton.textContent = "Open in New Tab";
        this.fullPageButton.style.marginTop = "10px";
        this.fullPageButton.onclick = this.openInNewTab.bind(this);
        this.container.appendChild(this.fullPageButton);

        // Create the "Open Full Page" button
        this.toggleFullScreenButton = document.createElement("fluent-button");
        this.toggleFullScreenButton.textContent = "Open Full Page";
        this.toggleFullScreenButton.style.marginTop = "10px";
        this.toggleFullScreenButton.style.marginLeft = "10px";
        this.toggleFullScreenButton.onclick = this.toggleFullScreen.bind(this);
        this.container.appendChild(this.toggleFullScreenButton);

        // Create the "Close" button for exiting full-screen mode
        this.exitFullScreenIcon = document.createElement("fluent-button");
        this.exitFullScreenIcon.textContent = "Close";
        this.exitFullScreenIcon.style.position = "fixed";
        this.exitFullScreenIcon.style.top = "15px";
        this.exitFullScreenIcon.style.right = "15px";
        this.exitFullScreenIcon.style.zIndex = "1001";
        this.exitFullScreenIcon.style.fontSize = "16px";
        this.exitFullScreenIcon.style.cursor = "pointer";
        this.exitFullScreenIcon.style.background = "none"; // No background for minimalistic style
        this.exitFullScreenIcon.style.border = "none"; // No border
        this.exitFullScreenIcon.style.display = "none"; // Initially hidden
        this.exitFullScreenIcon.onclick = this.toggleFullScreen.bind(this);
        document.body.appendChild(this.exitFullScreenIcon);
    }

    /**
     * Updates the view with new data or property changes.
     * Constructs the full URL from parts and controls iframe dimensions and button visibility.
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const { UrlPart1, UrlPart2, UrlPart3, QueryStringName, QueryStringValue, Height, Width, EnableOpenInNewTab, EnableOpenFullPage } = context.parameters;

        // Construct the full URL from the parts
        let fullUrl = `${UrlPart1.raw || ""}${UrlPart2.raw || ""}${UrlPart3.raw || ""}`;
        if (QueryStringName.raw && QueryStringValue.raw) {
            const separator = fullUrl.includes('?') ? '&' : '?';
            fullUrl += `${separator}${encodeURIComponent(QueryStringName.raw)}=${encodeURIComponent(QueryStringValue.raw)}`;
        }
        this.currentUrl = fullUrl;
        this.iframe.src = fullUrl;

        // Set iframe dimensions if specified
        if (Height.raw) this.iframe.style.height = `${Height.raw}px`;
        if (Width.raw) this.iframe.style.width = `${Width.raw}px`;

        // Display buttons based on configuration
        const enableOpenInNewTab = EnableOpenInNewTab.raw !== undefined ? EnableOpenInNewTab.raw : true;
        const enableOpenFullPage = EnableOpenFullPage.raw !== undefined ? EnableOpenFullPage.raw : true;
        this.fullPageButton.style.display = enableOpenInNewTab ? "inline-block" : "none";
        this.toggleFullScreenButton.style.display = enableOpenFullPage ? "inline-block" : "none";
    }

    /**
     * Opens the current URL in a new browser tab.
     */
    private openInNewTab(): void {
        if (this.currentUrl) {
            window.open(this.currentUrl, "_blank");
        }
    }

    /**
     * Toggles between full-screen and regular mode for the iframe.
     */
    private toggleFullScreen(): void {
        if (this.isFullScreen) {
            // Exit full-screen mode
            this.iframe.style.position = "relative";
            this.iframe.style.width = "100%";
            this.iframe.style.height = "300px";
            this.container.style.position = "relative";
            this.container.style.width = "auto";
            this.container.style.height = "auto";
            this.toggleFullScreenButton.textContent = "Open Full Page";
            this.exitFullScreenIcon.style.display = "none";
        } else {
            // Enter full-screen mode
            this.iframe.style.position = "fixed";
            this.iframe.style.top = "10px";
            this.iframe.style.left = "10px";
            this.iframe.style.width = "calc(100% - 20px)";
            this.iframe.style.height = "calc(100% - 20px)";
            this.iframe.style.zIndex = "1000";
            this.container.style.position = "fixed";
            this.container.style.width = "100vw";
            this.container.style.height = "100vh";
            this.container.style.zIndex = "999";
            this.toggleFullScreenButton.textContent = "Exit Full Page";
            this.exitFullScreenIcon.style.display = "flex";
        }
        this.isFullScreen = !this.isFullScreen;
    }

    /**
     * Returns the output of the control (none in this case).
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Cleans up the control by removing the full-screen exit button from the DOM.
     */
    public destroy(): void {
        document.body.removeChild(this.exitFullScreenIcon);
    }
}
