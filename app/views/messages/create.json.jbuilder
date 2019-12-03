json.content @message.content
json.image @message.image.url
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user @message.user.name
#json.created_at @message.group_id
