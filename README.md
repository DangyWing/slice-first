# Slicey McDataMover

This project gets data from dune queries [Lending Protocol query](https://dune.com/queries/3985374), [Perps Trader query](https://dune.com/queries/3985375) and pushes the data to a supabase database and serves an api that serves the data from the supabase database.

***NOTE:** this data does not update frequently and is just a proof of concept*

## Endpoints
[/api/duneLendingData](https://slice-first.vercel.app/api/duneLendingData) - This endpoint gets data from the Dune query and pushes the data to the supabase database.
[/api/dunePerpsData](https://slice-first.vercel.app/api/dunePerpsData) - This endpoint gets data from the Dune query and pushes the data to the supabase database.

[/api/sliceDb/lending](https://slice-first.vercel.app/api/sliceDb/lending) - This endpoint serves the data from the supabase database.
[/api/sliceDb/perps](https://slice-first.vercel.app/api/sliceDb/lending) - This endpoint serves the data from the supabase database.

## What's next?

I'd set up a cron job to run the /api/duneLendingData and /api/dunePerpsDataendpoint every 5 minutes and push the data to the supabase database and support multiple dune queries, possibly by adding a query parameter to the /api/dune endpoint or labeling endpoints separately.

Next I'd set up pagination for the dune queries and have them refresh the supabase dataset once a day.’