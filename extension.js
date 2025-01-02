const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Log activation message
	console.log('Congratulations, your extension "word-to-google" is now active!');

	// Register the command
	let disposable = vscode.commands.registerCommand('word-to-google.searchWord', function () {
		// Get the currently active editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found!');
			return;
		}

		// Get the selected text
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		if (!selectedText) {
			vscode.window.showWarningMessage('Please select a word to search.');
			return;
		}

		// Construct the Google search URL
		const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(selectedText)}+meaning`;

		// Open the URL in the default web browser
		vscode.env.openExternal(vscode.Uri.parse(googleSearchUrl));
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
