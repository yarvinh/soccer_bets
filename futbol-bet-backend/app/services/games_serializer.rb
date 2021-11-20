

  class GamesSerializer
    def initialize(user_object)
       @games = user_object
    end

  def to_serialized_json
      options = {
        include: {
          teams: {},
          likes: {},
          
          bets: {
            include: {
              user: {},
              team: {}
            }
          },
          comments_by_date: {
                      include:{
            user: {},
            replies_by_date: {
              include: {
                likes: {},
                user: {}
              }
            }
          }
          }      
        },
   
        except: [:updated_at, :created_at]
      }
      @games.to_json(options)
    end
  
  end