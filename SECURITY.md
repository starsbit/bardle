# Security Policy

## Supported Versions

Patches for security vulnerabilities are only provided for the latest minor version of the project. It is recommended to always use the latest version of the project to ensure you have the latest security patches. Since we do not store any sensitive information in this project, the risk of security vulnerabilities is low.

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | ✔ |
| < 2.0   | X                |

## Reporting a Vulnerability

Please open a GitHub issue to report any security vulnerabilities. We take security seriously and will respond promptly to address any reported vulnerabilities.

When reporting a security vulnerability, please include the following information:

## Security Best Practices

### Angular Project

1. **Keep Dependencies Updated**: Regularly update your Angular dependencies to the latest versions to ensure you have the latest security patches.
2. **Use Angular's Built-in Security Features**: Utilize Angular's built-in security features such as sanitization, content security policy (CSP), and Angular's HttpClient for making HTTP requests.
3. **Avoid Using `innerHTML`**: Avoid using `innerHTML` to insert dynamic content. Use Angular's data binding instead.
4. **Enable Strict Template Checking**: Enable strict template checking in your `tsconfig.json` to catch potential security issues early.
5. **Use Angular CLI**: Use Angular CLI to generate components, services, and other code to ensure best practices are followed.

### Python Scripts

1. **Validate Input**: Always validate and sanitize input data to prevent injection attacks.
2. **Use Secure Libraries**: Use well-maintained and secure libraries for making HTTP requests and handling JSON data.
3. **Handle Exceptions**: Properly handle exceptions to avoid exposing sensitive information.
4. **Limit Permissions**: Run your Python scripts with the least privileges necessary to reduce the impact of a potential security breach.
5. **Keep Dependencies Updated**: Regularly update your Python dependencies to the latest versions to ensure you have the latest security patches.

## Additional Resources

- [Angular Security Guide](https://angular.io/guide/security)
- [OWASP Python Security](https://owasp.org/www-project-python-security/)

Thank you for helping to keep this project secure!
