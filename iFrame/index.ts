import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class iFrame implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
    private container: HTMLDivElement;
    private iframe: HTMLIFrameElement;

    constructor() {}

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.container = container;

        // Create and configure the iframe
        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "300px"; // Set the initial height as needed
        this.container.appendChild(this.iframe);
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
    
        const urlvalue = context.parameters.UrlValue;
        const queryStringName = context.parameters.QueryStringName;
        const queryStringValue = context.parameters.QueryStringValue;
        const heightValue = context.parameters.Height; // Get the height value from the user
    
        let urldisabled = context.mode.isControlDisabled;
        let urlmasked = false;
        if (urlvalue && urlvalue.security) {
            urlmasked = !urlvalue.security.readable;
            urldisabled = urldisabled || urlmasked || !urlvalue.security.editable;
        }
        
        // Construct the full URL with query string if available
        let fullUrl = urlvalue && urlvalue.raw ? urlvalue.raw : "";
        if (queryStringName && queryStringName.raw && queryStringValue && queryStringValue.raw) {
            const separator = fullUrl.includes('?') ? '&' : '?';
            fullUrl += `${separator}${encodeURIComponent(queryStringName.raw)}=${encodeURIComponent(queryStringValue.raw)}`;
        }
    
        // Update iframe src based on fullUrl
        this.iframe.src = fullUrl;
    
        // Update iframe height based on user-supplied value
        if (heightValue && heightValue.raw) {
            const heightInPixels = `${heightValue.raw}px`;
            this.iframe.style.height = heightInPixels;
        }
    }
    

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
