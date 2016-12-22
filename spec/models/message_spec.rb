require 'rails_helper'
describe Message do
  describe "#create" do
    it "is invalid without body" do
      message = build(:message, body: nil)
      message.valid?
      expect(message.errors[:body]).to include("can't be blank")
    end

    it "is valid with body" do
      message = build(:message, body: "aaaaa")
      expect(message).to be_valid
    end
  end
end
