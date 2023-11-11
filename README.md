# Visitor's and Key Management System

## Getting Started

- First make sure you have Node installed. You can download it [here](https://nodejs.org/en/download)

    Confirm that you have NodeJS installed by running this command
    ```bash
    node -v
    ```

- Next make sure you have Typescript installed.

    - Install typescript using this command
    ```bash
    npm install -g typescript
    ```
    - Confirm that you have Typescript installed by running this command
    ```bash
    tsc -v
    ```

- Next install the dependencies for the project by running this command.

    ```bash
    npm install 
    ```

- Run the development server  

    ```bash
    npm run dev 
    ``` 


# Project Structure
- Please browse through the project and read the comments in the `index.ts` files to know where to put stuff

- File naming convention
    
    - Name all files in lowercase and replace all spaces with hyphens. For example, if you have a component called Modal Provider, name it `modal-provider.tsx`

    - For files that do not make use of `JSX` or `TSX`, please end it in `.ts` or `.js`. For example: `index.ts`

- Component naming convention

    Component declarations should be initally capitalized. FOr example: a file called `modal-provider.tsx` would have the component declaration looking like this

    ```tsx 
    export default function ModalProvider(){
        return (
            <div>
            </div>
        )
    }
    ```

Anything else that is not a component or a file name, like functions and variable names should use camel case. For example
```ts
const [open, setOpen] = useState(false)

function convertDate(date: string){}

```
