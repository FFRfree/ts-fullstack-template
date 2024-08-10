"use server";

import { UserTable } from "@/modules/user";

async function Page() {
  // const utils = trpc.useUtils();
  // await Promise.all([utils.resources.user.findAll.prefetch()]);
  return <UserTable />;
}

export default Page;

// function Page2() {
//   const {} = api.resources.user.findAll.useQuery();
//   console.log("render");
//   return (
//     <div>
//       <DataSource data={data} />
//       <Button onClick={() => result.refetch()}>refresh</Button>
//       {result.isLoading || result.isFetching ? <LoadingSpinner /> : null}
//       {/* <UserTable /> */}
//     </div>
//   );
// }
