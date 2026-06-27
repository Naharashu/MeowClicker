export default {


	async fetch(request, env) {
		const Config = Object.freeze({
			MAX_DELTA: 2.6,
			MAX_STEP: 64,
			MAX_INCOME: 99840
		});

		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		const data = await request.json();


		let player =
			await env.DB
				.prepare(
					"SELECT * FROM players WHERE id=?"
				)
				.bind(data.id)
				.first();


		if (!player) {

			await env.DB
				.prepare(
					"INSERT INTO players(id,total,delta,step) VALUES(?,?,?,?)"
				)
				.bind(
					data.id,
					0,
					1,
					1,
				)
				.run();


			player = {
				id: data.id,
				total: 0,
				delta: 1,
				step: 1
			};
		}


		if (data.action === "click") {
			if (data.cps >= 21) return Response.json(player, {
				headers: corsHeaders,
			});

			const temp = player.delta * player.step * data.cps;
			if (temp > Config.MAX_INCOME) return Response.json(player, {
				headers: corsHeaders,
			});
			player.total += temp;


			await env.DB
				.prepare(
					"UPDATE players SET total=? WHERE id=?"
				)
				.bind(
					player.total,
					player.id
				)
				.run();
		} else if (data.action === "delete") {
			await env.DB.prepare("DELETE FROM players WHERE id=?").bind(player.id).run();
			return Response.json({
				deleted: true
			}, {
				headers: corsHeaders
			});
		} else if (data.action === "buy") {
			switch (data.itemID) {
				case "delta01": {
					await env.DB.prepare(
						"UPDATE players SET delta=?, total=? WHERE id=?"
					)
						.bind(
							player.delta + 0.1,
							player.total - data.needed,
							player.id
						)
						.run();
					
				}
				case "delta05": {
					await env.DB.prepare(
						"UPDATE players SET delta=?, total=? WHERE id=?"
					)
						.bind(
							player.delta + 0.5,
							player.total - data.needed,
							player.id
						)
						.run();
					
				}
				case "delta10": {
					await env.DB.prepare(
						"UPDATE players SET delta=?, total=? WHERE id=?"
					)
						.bind(
							player.delta + 1.0,
							player.total - data.needed,
							player.id
						)
						.run();
					
				}
				case "stepx2": {
					await env.DB.prepare(
						"UPDATE players SET step=?, total=? WHERE id=?"
					)
						.bind(
							player.step * 2,
							player.total - data.needed,
							player.id
						)
						.run();
					
				}
				case "stepx4": {
					await env.DB.prepare(
						"UPDATE players SET step=?, total=? WHERE id=?"
					)
						.bind(
							player.step * 4,
							player.total - data.needed,
							player.id
						)
						.run();
					
				}
				case "stepx8": {
					await env.DB.prepare(
						"UPDATE players SET step=?, total=? WHERE id=?"
					)
						.bind(
							player.step * 8,
							player.total - data.needed,
							player.id
						)
						.run();
					
				}
			}
		}


		return Response.json(player, {
			headers: corsHeaders,
		});
	}

};