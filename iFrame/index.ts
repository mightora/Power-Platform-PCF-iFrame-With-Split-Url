import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class iFrame implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private iframe: HTMLIFrameElement;

    constructor() {
        // Constructor is empty, used for initial setup if necessary
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container;

        // Creates the iframe element, setting initial styles, and adds it to the container
        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "300px"; // Default height
        this.container.appendChild(this.iframe);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Extracts URL, query string, and height values from the context
        const { UrlValue, QueryStringName, QueryStringValue, Height } = context.parameters;

        // Constructs the full URL with query string if provided
        let fullUrl = UrlValue.raw ? UrlValue.raw : "";
        if (QueryStringName.raw && QueryStringValue.raw) {
            const separator = fullUrl.includes('?') ? '&' : '?';
            fullUrl += `${separator}${encodeURIComponent(QueryStringName.raw)}=${encodeURIComponent(QueryStringValue.raw)}`;
        }

        // Updates iframe src to the constructed URL
        this.iframe.src = fullUrl;

        // Updates iframe height based on the context, if provided
        if (Height.raw) {
            this.iframe.style.height = `${Height.raw}px`;
        }
    }

    public getOutputs(): IOutputs {
        // Returns an empty object as this control does not produce output
        return {};
    }

    public destroy(): void {
        // Cleanup code can be added here if necessary
    }
}
