{
  description = "";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
  };

  outputs = { self, nixpkgs }: {
    devShells.default = nixpkgs.mkShell {
      buildInputs = [
        nixpkgs.erlang
        nixpkgs.rebar3
        nixpkgs.nodejs
        nixpkgs.pnpm
      ];
    };
  };
}