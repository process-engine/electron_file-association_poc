# Electron file association PoC

## What does it

This proof of concept sets a file association for the .bpmn extension
and opens the electron app automatically when double clicking on a ```.bpmn```
file.

## How to use it

- ```npm install```
- ```npm run build```

Then go into the dist folder. There you will find a ```.dmg``` file for MacOS
and a ```.exe``` file for Windows.

## How to get the file path on Windows

On Windows the file path of the file which has to be opened is saved as a value
in 
```javascript
process.argv[1]
```

## How to get the file path on MacOS

On MacOS you can get the file path by using
```javascript
app.on('open-file', function (event, path) {})
```
The file path is then saved in the path variable.

## How to get the file infos

You simply read the file with
```javascript
fs.readFileSync(<filePath>, 'utf-8)
```
and save the output into a variable.

## How to send these infos to the renderer thread

You have to require the ipcRenderer from the electron package:
```javascript
const ipcRenderer = window.nodeRequire("electron").ipcRenderer;
```
Then you can send an event to the main thread with
```javascript
const fileInfo = ipcRenderer.sendSync("get_opened_file");
```

In the main thread you catch this event with
```javascript
electron.ipcMain.on('get_opened_file', (event) => {})
```
Then you can read the file and send the content to the renderer thread
by 
```javascript
event.returnValue = {
  path: filePath,
  content: fs.readFileSync(filePath, 'utf-8'),
}
```

## How to set the file association

The file association can be set inside the ```package.json```

### For Windows

Just add 
```json
"fileAssociations": [
  {
    "ext": ["bpmn"],
    "name": "BPMN",
    "description": "BPMN diagram extension"
  }
]
```
into your ```win``` config.

### For MacOS

Just add
```json
"fileAssociations": [
  {
    "ext": ["bpmn"],
    "name": "BPMN"
  }
]
```
into your ```mac``` config.