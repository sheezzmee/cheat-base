export default {
	send: /function\([\w$]+\)\{var [\w$]+=this\.[\w$]+\[[\w$]+\.[\w$]+\(\)\];null==[\w$]+\|\|[\w$]+\.[\w$]+\([\w$]+\)\}/,
	on: /function\([\w$]+,[\w$]+,[\w$]+,[\w$]+\)\{var [\w$]+=[\w$]+\(\)\.[\w$]+\([\w$]+\),[\w$]+=this\.[\w$]+\[[\w$]+\],[\w$]+=null==[\w$]+\?function\([\w$]+,[\w$]+\)/
};
