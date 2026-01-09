// ============================================
// GLOBAL DEVICE VISIBILITY CONTROLS
// This script manages device visibility across all pages
// ============================================

// Device visibility state - default all to true
let deviceVisibility = {
    mobile: localStorage.getItem('deviceVisibility_mobile') === null ? true : localStorage.getItem('deviceVisibility_mobile') === 'true',
    tablet: localStorage.getItem('deviceVisibility_tablet') === null ? true : localStorage.getItem('deviceVisibility_tablet') === 'true',
    desktop: localStorage.getItem('deviceVisibility_desktop') === null ? true : localStorage.getItem('deviceVisibility_desktop') === 'true',
    mac: localStorage.getItem('deviceVisibility_mac') === null ? true : localStorage.getItem('deviceVisibility_mac') === 'true'
};

// Current preview mode - stored globally
let currentPreviewMode = localStorage.getItem('currentPreviewMode') || null;

// Initialize device visibility on page load
function initializeDeviceVisibility() {
    // Update toggle states
    updateToggleState('mobile', deviceVisibility.mobile);
    updateToggleState('tablet', deviceVisibility.tablet);
    updateToggleState('desktop', deviceVisibility.desktop);
    updateToggleState('mac', deviceVisibility.mac);

    // Detect current device
    detectCurrentDevice();
    
    // Apply saved preview mode if exists
    if (currentPreviewMode) {
        applyPreviewMode(currentPreviewMode, false);
    }
}

// Apply preview mode
function applyPreviewMode(deviceType, showNotification = true) {
    // Remove all preview classes first
    document.body.classList.remove('preview-mobile', 'preview-tablet', 'preview-desktop', 'preview-mac');
    
    if (deviceType) {
        // Add the preview class
        document.body.classList.add('preview-' + deviceType);
        
        // Update button states
        document.querySelectorAll('.preview-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.textContent = '👁️ Preview';
        });
        
        const previewBtn = document.getElementById('preview' + deviceType.charAt(0).toUpperCase() + deviceType.slice(1));
        if (previewBtn) {
            previewBtn.classList.add('active');
            previewBtn.textContent = '✓ Active';
        }
        
        if (showNotification) {
            const deviceNames = {
                mobile: 'Mobile Preview (375px)',
                tablet: 'Tablet Preview (768px)',
                desktop: 'Desktop Preview (1440px)',
                mac: 'Mac Preview (1920px)'
            };
            
            showPreviewIndicator(deviceNames[deviceType]);
            if (typeof showToast === 'function') {
                showToast('Switched to ' + deviceNames[deviceType], 'info', 2000);
            }
        }
    }
}

// Preview device function
function previewDevice(deviceType) {
    // If clicking the same device, exit preview mode
    if (currentPreviewMode === deviceType) {
        // Remove all preview classes
        document.body.classList.remove('preview-mobile', 'preview-tablet', 'preview-desktop', 'preview-mac', 'preview-custom');
        
        // Reset custom styles
        document.body.style.maxWidth = '';
        document.body.style.margin = '';
        document.body.style.boxShadow = '';
        document.body.style.position = '';
        
        // Remove active state from all preview buttons
        document.querySelectorAll('.preview-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.textContent = '👁️ Preview';
        });
        
        currentPreviewMode = null;
        localStorage.removeItem('currentPreviewMode');
        showPreviewIndicator('Normal View');
        if (typeof showToast === 'function') {
            showToast('Exited preview mode', 'info', 2000);
        }
        return;
    }

    // Set new preview mode
    currentPreviewMode = deviceType;
    localStorage.setItem('currentPreviewMode', deviceType);
    
    // Apply the preview mode
    applyPreviewMode(deviceType, true);
    
    // Update slider
    updateSliderFromPreview(deviceType);
}

// Show preview indicator
function showPreviewIndicator(message) {
    const indicator = document.getElementById('previewIndicator');
    if (indicator) {
        indicator.textContent = message;
        indicator.classList.add('show');
        
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 2000);
    }
}

// Detect current device type
function detectCurrentDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isMac = /macintosh|mac os x/i.test(userAgent);
    const isWindows = /windows/i.test(userAgent);
    const isLinux = /linux/i.test(userAgent) && !isMobile;

    // Add current device badge
    if (isMobile) {
        addCurrentDeviceBadge('mobile');
    } else if (isMac) {
        addCurrentDeviceBadge('mac');
    } else if (isWindows || isLinux) {
        addCurrentDeviceBadge('desktop');
    }
}

// Add current device badge
function addCurrentDeviceBadge(deviceType) {
    const deviceOption = document.getElementById(deviceType + 'Option');
    if (deviceOption) {
        const deviceName = deviceOption.querySelector('.device-name');
        
        if (deviceName && !deviceName.querySelector('.current-device-badge')) {
            const badge = document.createElement('span');
            badge.className = 'current-device-badge';
            badge.textContent = 'Current';
            deviceName.appendChild(badge);
        }
    }
}

// Toggle device visibility
function toggleDeviceVisibility(deviceType) {
    deviceVisibility[deviceType] = !deviceVisibility[deviceType];
    
    // Save to localStorage
    localStorage.setItem('deviceVisibility_' + deviceType, deviceVisibility[deviceType]);
    
    // Update UI
    updateToggleState(deviceType, deviceVisibility[deviceType]);
    
    // Show notification
    const deviceNames = {
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
        mac: 'Mac'
    };
    
    const status = deviceVisibility[deviceType] ? 'enabled' : 'disabled';
    if (typeof showToast === 'function') {
        showToast(deviceNames[deviceType] + ' visibility ' + status + ' (Preview only)', 'info', 2000);
    }
}

// Update toggle state
function updateToggleState(deviceType, isActive) {
    const toggle = document.getElementById(deviceType + 'Toggle');
    const option = document.getElementById(deviceType + 'Option');
    
    if (toggle) {
        if (isActive) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    }
    
    if (option) {
        if (isActive) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    }
}

// Toggle device visibility panel with automatic device cycling
function toggleDevicePanel() {
    const panel = document.getElementById('deviceVisibilityPanel');
    if (panel) {
        panel.classList.toggle('show');
    }
}

// Automatic device cycling when clicking main button
let deviceCycleIndex = 0;
const deviceCycleOrder = ['mobile', 'tablet', 'desktop', 'mac'];

function cycleDeviceView() {
    // Cycle through devices
    const currentDevice = deviceCycleOrder[deviceCycleIndex];
    
    // Apply preview mode
    previewDevice(currentDevice);
    
    // Update button text
    const btn = document.getElementById('deviceVisibilityBtn');
    if (btn) {
        const deviceIcons = {
            mobile: '📱',
            tablet: '📱',
            desktop: '💻',
            mac: '🍎'
        };
        const deviceNames = {
            mobile: 'Mobile View',
            tablet: 'Tablet View',
            desktop: 'Desktop View',
            mac: 'Mac View'
        };
        btn.innerHTML = `${deviceIcons[currentDevice]} ${deviceNames[currentDevice]}`;
    }
    
    // Move to next device
    deviceCycleIndex = (deviceCycleIndex + 1) % deviceCycleOrder.length;
}

// Device slider functionality
function initializeDeviceSlider() {
    const slider = document.getElementById('deviceSlider');
    const sliderValue = document.getElementById('sliderValue');
    const markers = document.querySelectorAll('.marker');
    
    if (slider && sliderValue) {
        // Update slider value display
        slider.addEventListener('input', function() {
            const width = this.value;
            sliderValue.textContent = width + 'px';
            applyCustomWidth(width);
        });
        
        // Snap to preset values on release
        slider.addEventListener('change', function() {
            const width = parseInt(this.value);
            let snapWidth = width;
            
            // Snap to nearest preset
            const presets = [375, 768, 1440, 1920];
            let minDiff = Infinity;
            
            presets.forEach(preset => {
                const diff = Math.abs(width - preset);
                if (diff < minDiff && diff < 100) {
                    minDiff = diff;
                    snapWidth = preset;
                }
            });
            
            this.value = snapWidth;
            sliderValue.textContent = snapWidth + 'px';
            applyCustomWidth(snapWidth);
            
            // Update preview mode based on snapped width
            if (snapWidth === 375) {
                currentPreviewMode = 'mobile';
                applyPreviewMode('mobile', true);
            } else if (snapWidth === 768) {
                currentPreviewMode = 'tablet';
                applyPreviewMode('tablet', true);
            } else if (snapWidth === 1440) {
                currentPreviewMode = 'desktop';
                applyPreviewMode('desktop', true);
            } else if (snapWidth === 1920) {
                currentPreviewMode = 'mac';
                applyPreviewMode('mac', true);
            }
        });
    }
    
    // Marker click functionality
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const width = this.getAttribute('data-width');
            if (slider && sliderValue) {
                slider.value = width;
                sliderValue.textContent = width + 'px';
                applyCustomWidth(width);
                
                // Trigger preview mode
                if (width === '375') {
                    previewDevice('mobile');
                } else if (width === '768') {
                    previewDevice('tablet');
                } else if (width === '1440') {
                    previewDevice('desktop');
                } else if (width === '1920') {
                    previewDevice('mac');
                }
            }
        });
    });
}

// Apply custom width to body
function applyCustomWidth(width) {
    // Remove all preview classes
    document.body.classList.remove('preview-mobile', 'preview-tablet', 'preview-desktop', 'preview-mac');
    
    // Add custom preview class
    document.body.classList.add('preview-custom');
    
    // Set custom width
    document.body.style.maxWidth = width + 'px';
    document.body.style.width = width + 'px';
    document.body.style.margin = '0 auto';
    document.body.style.boxShadow = '0 0 60px rgba(0, 0, 0, 0.4)';
    document.body.style.position = 'relative';
    document.body.style.overflowX = 'hidden';
    
    // Update slider value in panel
    const sliderValue = document.getElementById('sliderValue');
    if (sliderValue) {
        sliderValue.textContent = width + 'px';
    }
}

// Update slider when preview mode changes
function updateSliderFromPreview(deviceType) {
    const slider = document.getElementById('deviceSlider');
    const sliderValue = document.getElementById('sliderValue');
    
    if (slider && sliderValue) {
        const widthMap = {
            mobile: 375,
            tablet: 768,
            desktop: 1440,
            mac: 1920
        };
        
        const width = widthMap[deviceType];
        if (width) {
            slider.value = width;
            sliderValue.textContent = width + 'px';
        }
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeDeviceVisibility();
        initializeDeviceSlider();
    });
} else {
    initializeDeviceVisibility();
    initializeDeviceSlider();
}
