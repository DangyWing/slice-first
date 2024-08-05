# Slicey McDataMover

This project gets data from a [Dune query](https://dune.com/queries/3958723) and pushes the data to a supabase database and serves and api that serves the data from the supabase database.

***NOTE:** this data does not update frequently and is just a proof of concept*

## Endpoints
[/api/dune](https://slice-first.vercel.app/api/dune) - This endpoint gets the data from the Dune query and pushes the data to the supabase database.

[/api/sliceDb](https://slice-first.vercel.app/api/sliceDb) - This endpoint serves the data from the supabase database.

## What's next?

I'd set up a cron job to run the /api/dune endpoint every 5 minutes and push the data to the supabase database and support multiple dune queries, possibly by adding a query parameter to the /api/dune endpoint or labeling endpoints separately.’