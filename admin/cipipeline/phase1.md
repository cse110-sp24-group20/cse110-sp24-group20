# Status Report
### Linting and Code Style Enforcement
 - Our project has two places for linting. In the terminal, we may run ``npx eslint .`` to run ESLint to check our code. On top of that, our codacy also incorporates a linter that needs to pass in order to merge a pull request
### Code Quality via Tool
- Tool choice: We compared Codeclimate and Codacy then found that Codacy is more straightforward and powerful to use.
- Procedure: We first followed the instructions on Codacy to link our team repository to Codacy, so that the platform could get access to the code we would be writing. Then, we created a new branch on our repository that contains the same content as the CI/CD branch but some extra empty lines in ci-cd.yml and apply Codacy to this branch as a safety test. We let Codacy run the code on this branch and received 0 issues. Then we repeated this process again for the CI/CD branch. This time instead of testing from Codacy platform, we tried it from GitHub by submitting a pull request directly, and after checking conflicts both GitHub and Codacy indicated that the code quality is in a good standard. It is our first time trying to detect code quality via tools, so we realized applying tools like Codacy is very secure and helpful for our code development.    
- Exception: We did not realize our repository did not have a docs/ folder for Codacy to ignore and this caused trouble for later procedures like merging the jsdocs branch. We resolved the issue by changing the default branch to documenation-generate branch and ignored the docs/ folder. 
### Code Quality via Human Review
 - We require two reviews and approvals for every pull request into main
 - This allows us to be sure that nobody can accidentally harm our main branch by merging faulty code without sufficient review
### Unit Tests via Automation
- Tool Choice: We opted for Jest due to its widespread adoption and robust support for JavaScript-based applications. Its library and capabilities make it particularly useful for our needs.
- Procedure: We first added Jest as a step in our GitHub Actions CI pipeline. To implement this, we configured a .github/workflows/ci-cd.yml file where we specified Jest as a command to run tests. Then we create the `__tests__/pipeline.test.js` file that will contain all future unit tests. There is a formatted standard in the file to ensure that each unit test will be isolated, focusing on one function or module at a time.
- Running Tests: On every push or pull request, the tests are automatically executed. If a test fails, the workflow stops, preventing merging until issues are resolved.
### Documentation Automation
We set up JSDocs in order to create documentation automatically after every merge.
### E2E Testing
Our team recognizes the importance of end to end “E2E” testing as it ensures the reliability of our software product. We have yet to fully incorporate E2E testing into our development process, but plan to implement it as soon as we step foot into our development process. We will first plan what parts of our software needs to be tested, and set up a testing environment. Then, we will be able to identify scenarios and make test scripts accordingly. Integrating E2E testing frameworks into our continuous integration and delivery pipelines is a priority as we understand how important it is to enable automated testing across our entire stack.
