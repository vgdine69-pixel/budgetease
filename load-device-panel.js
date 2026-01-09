// Load Device Visibility Panel HTML into the page
(function() {
    // Check if panel already exists
    if (document.getElementById('deviceVisibilityBtn')) {
        return;
    }
    
    // Embed the panel HTML directly (to avoid CORS issues with file:// protocol)
    const panelHTML = `
<!-- Device Visibility Toggle Button -->
<button class="device-visibility-toggle-main" onclick="cycleDeviceView()" id="deviceVisibilityBtn">
    🖥️ Device Visibility
</button>

<!-- Settings Button for Panel -->
<button class="device-settings-btn" onclick="toggleDevicePanel()" id="deviceSettingsBtn" title="Device Settings">
    ⚙️
</button>

<!-- Device Visibility Control Panel -->
<div class="device-visibility-panel" id="deviceVisibilityPanel">
    <div class="device-visibility-header">
        <div class="device-visibility-title">
            🖥️ Device Visibility Options
        </div>
        <button class="device-visibility-toggle-btn" onclick="toggleDevicePanel()" title="Close">
            ✕
        </button>
    </div>

    <div class="device-option" id="mobileOption">
        <div class="device-option-content">
            <div class="device-info">
                <div class="device-icon">📱</div>
                <div class="device-details">
                    <div class="device-name">Mobile View</div>
                    <div class="device-status">375px - Smartphones</div>
                </div>
            </div>
            <div class="preview-controls">
                <button class="preview-btn" onclick="previewDevice('mobile')" id="previewMobile">👁️ Preview</button>
                <div class="device-toggle active" id="mobileToggle" onclick="toggleDeviceVisibility('mobile')"></div>
            </div>
        </div>
    </div>

    <div class="device-option" id="tabletOption">
        <div class="device-option-content">
            <div class="device-info">
                <div class="device-icon">📱</div>
                <div class="device-details">
                    <div class="device-name">Tablet View</div>
                    <div class="device-status">768px - iPad & Tablets</div>
                </div>
            </div>
            <div class="preview-controls">
                <button class="preview-btn" onclick="previewDevice('tablet')" id="previewTablet">👁️ Preview</button>
                <div class="device-toggle active" id="tabletToggle" onclick="toggleDeviceVisibility('tablet')"></div>
            </div>
        </div>
    </div>

    <div class="device-option" id="desktopOption">
        <div class="device-option-content">
            <div class="device-info">
                <div class="device-icon">💻</div>
                <div class="device-details">
                    <div class="device-name">Desktop View</div>
                    <div class="device-status">1440px - Windows & Linux</div>
                </div>
            </div>
            <div class="preview-controls">
                <button class="preview-btn" onclick="previewDevice('desktop')" id="previewDesktop">👁️ Preview</button>
                <div class="device-toggle active" id="desktopToggle" onclick="toggleDeviceVisibility('desktop')"></div>
            </div>
        </div>
    </div>

    <div class="device-option" id="macOption">
        <div class="device-option-content">
            <div class="device-info">
                <div class="device-icon">🍎</div>
                <div class="device-details">
                    <div class="device-name">Mac View</div>
                    <div class="device-status">1920px - macOS Devices</div>
                </div>
            </div>
            <div class="preview-controls">
                <button class="preview-btn" onclick="previewDevice('mac')" id="previewMac">👁️ Preview</button>
                <div class="device-toggle active" id="macToggle" onclick="toggleDeviceVisibility('mac')"></div>
            </div>
        </div>
    </div>

    <!-- Device Width Slider -->
    <div class="device-slider-container">
        <div class="slider-header">
            <span class="slider-label">📏 Adjust Device Width</span>
            <span class="slider-value" id="sliderValue">768px</span>
        </div>
        <input type="range" min="320" max="1920" value="768" class="device-slider" id="deviceSlider">
        <div class="slider-markers">
            <span class="marker" data-width="375">📱 Mobile</span>
            <span class="marker" data-width="768">📱 Tablet</span>
            <span class="marker" data-width="1440">💻 Desktop</span>
            <span class="marker" data-width="1920">🍎 Mac</span>
        </div>
    </div>

    <div class="visibility-info">
        💡 <strong>Tip:</strong> Use the slider to smoothly adjust device width, or click "Preview" buttons for preset sizes. All devices can access this page - toggles are for preview preferences only.
    </div>
</div>

<!-- Preview Mode Indicator -->
<div class="preview-indicator" id="previewIndicator"></div>
    `;
    
    // Create a container div
    const container = document.createElement('div');
    container.innerHTML = panelHTML;
    
    // Insert at the beginning of body
    document.body.insertBefore(container.firstChild, document.body.firstChild);
    
    // Insert remaining elements
    while (container.firstChild) {
        document.body.insertBefore(container.firstChild, document.body.children[1]);
    }
})();
