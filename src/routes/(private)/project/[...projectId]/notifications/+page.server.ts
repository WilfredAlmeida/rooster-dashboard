export const load = async ({locals, parent}) => {

    const {supabase} = locals;
    const parentData = await parent();

    const dbRes = await supabase.from("notifications").select("*").eq("project_id", parentData.project.id)

    if(dbRes.error){
        console.log(JSON.stringify(dbRes));
    }

    return{
        logs: dbRes.data
    }

}