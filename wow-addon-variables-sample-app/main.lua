GlobVarTestWow = "gep_plugin"
ow_var1 = "gep_plugin1"
owf_var2 = "gep_plugin2"
owf_var5 = "gep_plugin5"
owf_var6 = true

StaticPopupDialogs["MY_FIRST_POPUP"] = {
	text = "Please enter new value for owf_var2 variable",
	hasEditBox = 1,
	maxLetters = 15,
	OnShow = function(self)
		local editBox = self.editBox
		editBox:SetText("")
		editBox:SetFocus()
	end,
	EditBoxOnEnterPressed = function(self)
		local editBox = self:GetParent().editBox
		owf_var2 = editBox:GetText()
		owf_var5 = owf_var2.."_"..owf_var2

		print(owf_var2)
		self:GetParent():Hide()
		owf_var6 = 55
	end,
	EditBoxOnEscapePressed = function(self)
		self:GetParent():Hide()
		print("esc")
	end,
	timeout = 0,
	whileDead = 1,
	hideOnEscape = 1
}

print("start_lua")
StaticPopup_Show("MY_FIRST_POPUP")
print("end_lua")