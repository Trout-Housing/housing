^C+shift+V = preview README

All commands are run from the parent directory of "frontend/" and "backend/" in Git Bash.
### Frontend
- Start the localhost: `npm start --prefix ./frontend`.
- Connection string is hardcoded but the credentials require setting up an env var.

### Backend
- Compile and execute "DatabaseManager.java": `mvn -f backend/pom.xml compile exec:java -Dexec.mainClass="com.trout.db.DatabaseManager"`.
