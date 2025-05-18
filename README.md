# AmazonNode
## ProductService
- Move to the ProductService folder `cd ./ProductService`
- `npm i`
- For development server: `npm run dev`
- For production server: `npm run build` & `npm start`
- To run Prometheus, Grafana and ELK STACK for monitoring, Postgres database `docker compose up -d`
- To access Grafana `http://localhost:3001/`
- To access Kibana `http://localhost:5601/`
- Added logic for internationalization using i18n, use lang=en in query param
