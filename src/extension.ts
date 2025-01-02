// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import TreeItem from './views/menu/TreeItem';
//import RequestTreeItem from './views/menu/RequestTreeItem';
import TreeDataProvider from "./views/menu/TreeDataProvider";
import Request from './models/request';
import Controller from './controllers/mainController';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "thodev" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('thodev.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from fast-rest-client! testdebug');
	// });

	// context.subscriptions.push(disposable);
	const treeDataProvider = new TreeDataProvider();
	const controller = new Controller(treeDataProvider);
	context.subscriptions.push(vscode.window.registerTreeDataProvider("Menu", treeDataProvider));
  
	context.subscriptions.push(vscode.commands.registerCommand("RestClient.newRequest", () => {
	  const request = new Request('', '', 'GET', '{}', '', '{"proxy":""}');
	  controller.createRequestPanel(request);
	}));
	// context.subscriptions.push(vscode.commands.registerCommand("RestClient.historyRequest", (request: Request) => {
	//   controller.createRequestPanel(request);
	// }));
	context.subscriptions.push(vscode.commands.registerCommand("RestClient.makeRequest", (name:string, url: string, type: string, headers:string, body:string, form:string) => {
	  return controller.makeRequest(name, url, type, headers, body, form);
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
