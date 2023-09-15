import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ url, locals, parent }) => {
	// const { supabase } = locals;
	// const projectId = url.pathname.split('/')[2];
const parentData = await parent();
const project = parentData.project;
	// const res = await supabase
	// 	.from('projects')
	// 	.select("*")
	// 	.eq('id', projectId);

	// if (res.data!.length === 0) {
	// 	throw redirect(307, `${url.origin}/404`);
	// 	return error(404, { message: 'Project not found' });
	// }

	return {
		project: project
	};
};
