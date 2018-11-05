# Setting Up a Text Editor

Although you can use any text editor you want, I will provide you with instructions for using either VS Code or Atom. Although the installation is slightly more involved, I would recommend you use VS Code, as it opens and runs significantly faster than Atom (especially noticeable if using older machines in a computer lab). The one difficulty with this in a computer lab scenario is that you may require administrator rights to install Node.js. If you cannot install Node.js, the VS Code setup will still work without Node.js, but you will lose the ability to use ESLint to give you instant feedback about possible problems in your code.

## Setting Up Visual Studio Code
- Install Visual Studio Code
- Install Node.js (which also installs npm -- node package manager)
  - in VS Code, open Terminal and type `npm install -g eslint`
  - if you have installation problems with eslint, you can try updating npm [in VS Code, open Terminal and type `npm install npm@latest -g`]

- Install the following packages in VS Code
  - Live Server (lets you run your code on your local machine for testing)
  - ESLint (helps you write better formatted JavaScript, and warns you of errors as you type your code)
  - p5js Snippets (lets VS Code understand your )

## Setting Up Atom

Install the following packages (Atom Settings/Preferences -> Install):
- p5js-snippets
- p5js-toolbar
- atom-beautify
  - once installed, open Settings -> Packages -> atom-beautify Settings
  - select JavaScript -> Brace style -> end-expand
- linter-eslint
  - say yes to all dependencies during install

On Windows, add context menu to Windows Explorer by:
- Settings (Ctrl+Comma) -> System -> check all boxes

## For Each New Project

- make a copy of this template folder
- rename the folder to whatever you want your project to be called (your project will be at yourusername.github.io/projectname)
- move the newly renamed template folder into your GitHub repository folder
- edit `sketch.js` with your p5js code
- commit your changes to GitHub (via the GitHub desktop app)
- push your changes to the server

## Daily GitHub Workflow

- Fetch Origin (pull any changes from GitHub repo)
- do your work
- commit changes to GitHub
- push your changes
