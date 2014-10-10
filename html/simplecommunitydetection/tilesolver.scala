package tilesolver 

import org.scalatest.{FunSpec, GivenWhenThen}

class TilesSolverSuite extends FunSpec with GivenWhenThen{
	describe("A solution of the tile problem"){
		Given("an empty list")
		assertResult(Set())( (Nil).toSet )
	}
}