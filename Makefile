deploy:
	yarn build
	cp _ssr.json build
	roast deploy
