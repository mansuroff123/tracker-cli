import inquirer from "inquirer";

async function bootstrap() {
  console.log("Starting application...");
  inquirer
    .prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Enter you password',
            mask: '*',
        }
      /* Pass your questions in here */
    ])
    .then((answers) => {
        console.log('Password entered:', answers.password);
        
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

bootstrap();
