import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateAlphanumericString } from "$lib/utils"
import { goto } from '$app/navigation';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { supabase } = locals;
	const session = await locals.getSession();

	if (!session) throw redirect(303, "/login")

	const { user: { email } } = await locals.getSession();

	const { data: userData } = await supabase.from('users').select('id').eq('email', email);

	if (userData!.length === 0) {
		return error(404, 'User not found');
	}
	const userIdInDb = userData![0].id;

	const { data: projectData } = await supabase
		.from('projects')
		.select(
			`
        projectId:id,
        projectName:name,
        imageUrl:image_url,
        projectDescription:description,
        mintCount:mint_count,
        createdAt:created_at
    `
		)
		.eq('user_id', userIdInDb);

	if (!projectData || projectData!.length === 0) {
		return { projects: [] };
	}

	return { projects: projectData!.reverse() };
};

export const actions = {
	createProject: async ({ request, locals, url, }) => {
		const { supabase } = locals;
		const session = await locals.getSession()
		console.log('IN ACTION');

		const formData = await request.formData();

		const name = formData.get('projectName')?.toString();
		const serviceRoleJson = formData.get('serviceRoleInput')?.toString();

		if (!name || name.length === 0 || !serviceRoleJson || serviceRoleJson.length === 0) {
			return fail(400, { message: 'Name, Service Role are required' });
		}

		const projectId = generateAlphanumericString(6);

		const {
			/* @ts-ignore */
			user: { email }
		} = session;

		const dbRes2 = await supabase.from("users").select("id").eq("email", email);

		const userId = dbRes2.data![0].id

		const dbRes = await supabase.from("projects").insert({
			id: projectId,
			name: name,
			user_id: userId,
			service_role_json: JSON.stringify(serviceRoleJson)
		})

		console.log('RESPONSE');
		console.log(JSON.stringify(dbRes));

		if (dbRes.error || dbRes.status!=201) {
			console.log(console.log(JSON.stringify(dbRes)));
			return fail(400, { message: 'Something went wrong' });
		}

		console.log("PROJECT CREATED");

		throw redirect(301,`${url.origin}/project/${projectId}`);

	}
};
