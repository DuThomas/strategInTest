const Main = () => {
	return (
		<div>
			<p>Strateg.In</p>
			<h1>
				Test technique
			</h1>
			<h2>
				API sécurisée par Register/Login
			</h2>
			<div>
				Nous vous demandons dedévelopper une application permettant de s’inscrire via des informations basiques.
			</div>
			<ul>
				<li> 
					Au premier accès, l’utilisateur doit se créer un compte (email, mdp) sur la route {" "}
					<a href="http://localhost:3000/register">/register</a>
				</li>
				<li> 
					Une fois le compte créé, l’utilisateur doit utiliser la route {" "}
					<a href="http://localhost:3000/login">/login</a> {" "}
					pour récupérer un token.
				</li>
				<li> 
					Une fois logué, l’utilisateur peut accéder à la liste des utilisateurs déjà enregistrés sur la plateforme via la route {" "}
					<a href="http://localhost:3000/users">/users</a>
				</li>
			</ul>
			<h2>
				Exigences
			</h2>
			<ul>
				<li> 
					Langage:Node.js
				</li>
				<li> 
					Normes et dépendances : ES6, fonctions fléchées, Express, Mongoose
				</li>
				<li> 
					DB : MongoDB (Possibilité de créer une DB gratuite via un compte Atlas)
				</li>
			</ul>
		</div>
	)
}

export default Main
