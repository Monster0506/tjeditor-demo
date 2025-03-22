import React, { useState } from "react";
import "./Example.css";
import { TJEditor, TJRenderer } from "@monster0506/tjeditor";

const customCalloutIcons = {
  info: "💡",
  warning: "⚠️",
  error: "❌",
  success: "✅",
  note: "📝",
};

const defaultContent = `# Welcome to TJEditor

A modern, feature-rich markdown editor with real-time preview.

::info Smart Features
- Fuzzy search for links and callouts
- Real-time preview with split view
- Custom callout blocks with icons
- Code syntax highlighting
- Keyboard shortcuts

::success Getting Started
1. Type \`[[\` to search for links
2. Type \`::\` to add callouts
3. Use \`?\` for tooltips
4. Use \`||\` for spoilers

\`\`\`javascript
// Example code block
function welcome() {
  console.log("Happy editing! 🎉");
}
\`\`\`

::note Quick Tip
Try the split view mode for the best editing experience! 🚀
`;

const EXAMPLE_LINKS = [
  { title: "Getting Started", url: "/docs/getting-started" },
  { title: "Demo", url: "/demo" },
  { title: "Installation", url: "/docs/installation" },
  { title: "Features", url: "/docs/features" },
  { title: "API Reference", url: "/docs/api" },
  { title: "Examples", url: "/docs/examples" },
  { title: "Configuration", url: "/docs/config" },
  { title: "Plugins", url: "/docs/plugins" },
  { title: "Themes", url: "/docs/themes" },
  { title: "Contributing", url: "/docs/contributing" },
  { title: "FAQ", url: "/docs/faq" },
];

const Example = () => {
  const [content, setContent] = useState(defaultContent);
  const [showPreview, setShowPreview] = useState(false);
  const [showSplitScreen, setShowSplitScreen] = useState(true);

  const handleChange = (newContent) => {
    setContent(newContent);
  };

  // Link suggestions handler
  const getLinkSuggestions = async (searchText) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Filter and sort links by fuzzy match score
    return EXAMPLE_LINKS;
  };

  // Custom preview function for internal links
  const handlePreview = async (url) => {
    // Simulate fetching preview content
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (url === "/demo") {
      return `# Demo Preview
      
Here's a preview with **markdown** support!

::info Cool Feature
You can use all markdown features in previews:
- Lists
- *Italic*
- \`code\`
- [[Nested Links]](/nested)

And even code blocks:
\`\`\`javascript
function demo() {
  return "Hello!";
}
\`\`\`
`;
    }
    return `# Preview for ${url}

`;
  };

  // Custom copy function
  const handleCopy = async (code) => {
    console.log("Custom copy handler:", code);
    await navigator.clipboard.writeText(code);
  };

  // Custom link click handler
  const handleLinkClick = async (url) => {
    console.log("Link clicked:", url);
    // You could navigate to the link, open in new tab, etc.
  };

  return (
    <div className="example-container">
      <div className="toolbar">
        <div className="toolbar-group">
          <button
            className={`toolbar-button ${!showSplitScreen && !showPreview ? "active" : ""}`}
            onClick={() => {
              setShowPreview(false);
              setShowSplitScreen(false);
            }}
            title="Editor Mode"
          >
            <span className="material-icons">edit_note</span>
            Editor
          </button>
          <button
            className={`toolbar-button ${showPreview ? "active" : ""}`}
            onClick={() => {
              setShowPreview(true);
              setShowSplitScreen(false);
            }}
            title="Preview Mode"
          >
            <span className="material-icons">preview</span>
            Preview
          </button>
          <button
            className={`toolbar-button ${showSplitScreen ? "active" : ""}`}
            onClick={() => {
              setShowSplitScreen(true);
              setShowPreview(false);
            }}
            title="Split View Mode"
          >
            <span className="material-icons">splitscreen</span>
            Split View
          </button>
        </div>
        <div className="toolbar-group">
          <button
            className="toolbar-button help-button"
            title="View Documentation"
          >
            <span className="material-icons">help_outline</span>
            Docs
          </button>
        </div>
      </div>

      <div className="editor-content">
        {showPreview && !showSplitScreen && (
          <div className="preview-wrapper">
            <div className="preview-container">
              <TJRenderer
                content={content}
                debounceMs={100}
                calloutIcons={customCalloutIcons}
                previewContent={handlePreview}
                onCopy={handleCopy}
                onLinkClick={handleLinkClick}
                remarkPlugins={[]}
                rehypePlugins={[]}
              />
            </div>
          </div>
        )}

        {!showPreview && !showSplitScreen && (
          <div className="preview-wrapper">
            <div className="preview-container">
              <TJEditor
                content={content}
                onChange={handleChange}
                theme="monochrome"
                getLinkSuggestions={getLinkSuggestions}
              />
            </div>
          </div>
        )}

        {showSplitScreen && (
          <div className="split-container">
            <div className="split-pane">
              <div className="pane-header">
                <span className="material-icons">edit_note</span>
                Editor
              </div>
              <div className="preview-wrapper">
                <div className="preview-container">
                  <TJEditor
                    content={content}
                    onChange={handleChange}
                    theme="ocean"
                    getLinkSuggestions={getLinkSuggestions}
                  />
                </div>
              </div>
            </div>

            <div className="split-pane">
              <div className="pane-header">
                <span className="material-icons">preview</span>
                Preview
              </div>
              <div className="preview-wrapper">
                <TJRenderer
                  content={content}
                  debounceMs={100}
                  calloutIcons={customCalloutIcons}
                  previewContent={handlePreview}
                  onCopy={handleCopy}
                  onLinkClick={handleLinkClick}
                  remarkPlugins={[]}
                  rehypePlugins={[]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Example;
