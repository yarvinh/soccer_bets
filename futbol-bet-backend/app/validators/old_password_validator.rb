class OldPasswordValidator < ActiveModel::Validator
    
    def validate(record)
       if record.old_password || record.id.nil?
            true
        else
         record.errors[:user] << "Incorrect old password"   
        end
    end
end
